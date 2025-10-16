# IHK_Projektantraege-Webservice

Hier wird alles dokumentiert, was benötigt wird, damit der Webservice läuft.

## Inhalt
- [Hinzufügen der .env](#hinzufügen-der-env)
- [Eintragen der HTTPS-Credentials](#eintragen-der-https-credentials)
  
## Hinzufügen der .env
Die `.env` muss in den Projektordner, also in `IHK_Projektantreage-Webservice/`, rein.

Der benötigte Inhalt sieht so aus:

```text
TOKEN_KEY=secureFooBar
MARIADB_HOST=0.0.0.0
MARIADB_USERNAME=foo
MARIADB_PASSWORD=bar
MAIL_HOST=mx.foo.de
MAIL_USERNAME=foo
MAIL_PASSWORD=bar
LDAP_URI=ldap://0.0.0.0
LDAP_BASE_DN=dc=foo,dc=bar
```

## Eintragen der HTTPS-Credentials

> [!note]
> Aktuell wurde HTTPS rausgenommen. Daher ist dieser Schritt nicht nötig

Damit HTTPS funktioniert und der Server starten kann, muss ein Zertifikat und ein private-Key vorhanden sein. 
Beide Files gehören in den `IHK_Projektantraege-Webservice/httpsCredentials/` Ordner.

Die Bennung der Dateien spielt **keine** Rolle, solange die Dateiendungen `.crt` und `.key` sind.

Um sich ein ein Selbst-Signiertes SSL Zertifikat zu machen, kann man folgende Befehle im Ordner `IHK_Projektantreage-Webservice/` ausführen:

 ```bash
 #Falls der Ordner noch nicht vorhanden ist
 mkdir ./httpsCredentials 

 # Einfach Enter drücken, um die Felder leer lassen
 openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./httpsCredentials/selfsigned.key -out ./httpsCredentials/selfsigned.crt
 ```