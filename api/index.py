import base64
from flask import Flask, request
from flask_cors import CORS
from PIL import Image 
from io import BytesIO
import scipy.sparse.linalg
import scipy.sparse
import numpy as np
from PIL import Image


app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/api/python" , methods=["GET"])
def hello_world():
    return "<p>Hello, World!</p>"

#gets base64 and returns base64
@app.route("/api/inputs", methods=["POST"], )
def create_todo_item():

    tmp = request.get_json()
    
    img = tmp["Image"]
    img = BytesIO(base64.b64decode(img))

    
    tri = tmp["Trimap"]
    tri = BytesIO(base64.b64decode(tri))



    foreground = cfm(img, tri)
    


    im_file = BytesIO()
    foreground.save(im_file, format="PNG")
    im_bytes = im_file.getvalue()  # im_bytes: image in binary format.
    im_b64 = base64.b64encode(im_bytes) 

        
    return im_b64, 201


def cfm(img, tri):



    """
    Schreib dein eigenes CF Programm
    Ziel: alpha ausrechnen (alles hier auf diesem file)
    """

    image  = np.array(Image.open( img).convert("RGB"))/255.0
    trimap = np.array(Image.open(tri).convert(  "L"))/255.0

    h, w, d = image.shape



    """
    Laplace-Matrix berechnen.
    """

    #Radius des Fensters
    r = 1

    #Fehlerakzeptanz
    epsilon = 1e-7

    #Einfach ein Counter der später für die einträge in i,j,v benutzt wird
    k = 0

    #Anzahl der Pixel
    n = h*w

    size = 2*r+1
    window_area = size * size

    #Hier wird die Trimap aufgebaut
    is_fg = (trimap > 0.9).flatten()
    is_bg = (trimap < 0.1).flatten()
    is_known = is_fg | is_bg
    is_unknown = ~is_known

    assert d == 3

    #Anzahl der Pixel, welche sich angeschaut werden (manche pixel werden doppelt, 3-fach etc angeschaut),
    #da wir uns die von jedem pixel, welches nicht am Rand ist das Fenster anschauen
    n_v = (w - 2 * r) * (h - 2 * r) * window_area ** 2

    # inner_array wird gespeichert y-wert
    i = np.empty(n_v, dtype=np.int64)

    # welche werte genau im inner array x-wert
    j = np.empty(n_v,  dtype=np.int64)
    v = np.empty(n_v, dtype=np.float64)




    for y in range(r,h-r):
        for x in range(r,w-r):

            neighbors = np.zeros(shape=(9), dtype=int)
            for tmpi in range(3):
                for tmpj in range(3):
                    neighbors.put(tmpi*tmpj + tmpj,(y+tmpi - r)*w + x+tmpj-r)
            if np.all(is_known[neighbors]):
                continue

            #Hier berechnen wir mu
            mu = np.zeros(3)
            for dc in range(3):
                # Hier berechnen wir den durchnitt von jeder Farben-Achse innerhalb des Fensters des pixels (x,y)
                mu[dc] = np.mean(image[y-r:y+r+1, x-r:x+r+1, dc])

            #Hier berechnen wir I - mu innerhalb des Fensters
            c = image[y-r:y+r+1, x-r:x+r+1]-mu

            #Hier berechnen wir die 3x3 Kovarianzmatrix für die verschiedenen Farb-achsen
            cov = np.zeros((3, 3))
            for p in range(3):
                for q in range(3):
                    cov[p, q] = np.mean(c[:, :, p] * c[:, :, q])

            #Hier addieren wir die cov mit einer 3x3 Diagonalmatrix mit epsilon/window_area (Da cov 3x3)
            cov_tmp = cov + epsilon / window_area * np.eye(3)

            #Hier berechnen wir die Inverse der cov_tmp
            inv = np.linalg.inv(cov_tmp)

            #Hier gehen wir mit 2 Pixeln (dyi,dxi) (dyj,dxj) durch das Fenster
            for dyi in range(2*r +1):
                for dxi in range(2*r +1):
                    for dyj in range(2*r +1):
                        for dxj in range(2*r +1):
                            # Hier berechnen wir wo die Values in der LM(laplace matrix) platziert werden sollen (i,j)
                            i[k] = (dxi + x - r) + (dyi + y - r)*w
                            j[k] = (dxj + x - r) + (dyj + y - r)*w
                            #print((dxi + x - r) + (dyi + y - r)*w)

                            #Hier berechnen wir das skalarprodukt von (I_i - mu_k)(inv_cov)(I_j - mu_k)
                            tmp = c[dyi, dxi].dot(inv).dot(c[dyj, dxj])

                            #Hier beenden wir die Formel für die LM
                            v[k] = (1.0 if (i[k] == j[k]) else 0.0) - (1 + tmp) / window_area

                            k += 1


    #Hier bauen wir endlich die Laplace Matrix
    L = scipy.sparse.csr_matrix((v, (i, j)), shape=(n, n))




    '''
    Nun könne wir nach alpha ausrechnen
    '''

    

    #Hier wird die Diagonalmatrix gebaut
    d = is_known.astype(np.float64)
    D = scipy.sparse.diags(d)

    #Hier wird die Diagonalmatrix mit lambda multipliziert und mit LM addiert
    lambda_value = 100.0
    A = lambda_value * D + L

    #Hier wird b_S berechnet
    b = lambda_value * is_fg.astype(np.float64)

    #Hier wird das LGS für alpha = lambda * b_S * (L + lambda * D_S)^{-1} berechnet
    alpha = scipy.sparse.linalg.spsolve(A, b).reshape(h, w)

    #Wir fusionieren die Alphawerte mit den dem Bild
    cutout = np.concatenate([image, alpha[:, :, np.newaxis]], axis=2)



    '''
    Nun werden die Alpha-werte als Bild abgespeichert und ausgegeben
    '''

    #Hier clippen wir die werte wieder zurück zu 0-255 und konvertieren es zu uint8
    #alpha = np.clip(alpha*255, 0, 255).astype(np.uint8)


    #Hier werden die Bilder geöffnet und uns gezeigt
    #Image.fromarray(alpha).show(title="alpha")



    '''
    Nun wird der Vordergrund als Bild abgespeichert und ausgegeben
    '''

    #Hier clippen wir die werte wieder zurück zu 0-255 und konvertieren es zu uint8
    cutout = np.clip(cutout*255, 0, 255).astype(np.uint8)


    #Hier werden die Bilder geöffnet und uns gezeigt
    #Image.fromarray(cutout).show(title="foreground")


    return  Image.fromarray(cutout)










