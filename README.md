# PrimaWS2019

[Designkonzept](https://github.com/AndreGrevinga/PrimaWS2019/blob/master/Abgabe/Designkonzept.pdf)

[Abgabe Archiv](https://github.com/AndreGrevinga/PrimaWS2019/blob/master/Abgabe/JungleFever.7z)


## Abgabe Abschlussaufgabe

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 | Jungle Fever
|    | Name                  | André Grevinga
|    | Matrikelnummer        | 254859
|  1 | Nutzerinteraktion     | Der Nutzer kann sich mit "a" und "d" bewegen, außerdem kann er mit "w" springen. Mit "e" kann er den grappling hook werfen (WIP, funktioniert noch nicht).                                                                                                                                                 |
|  2 | Objektinteraktion     | Wenn der Spieler mit einem der Platformer kollidiert, wird seine Y-Position auf die Y-Position der Platform gesetzt, ausser wenn der Spieler gerade eine positive Y-Geschwindigkeit hat, da er dann von unten auf die Plattform trifft. Dann wird seine Y-Geschwindigkeit auf -0,1 gesetzt und seine Y-Position ein wenig nach unten verschoben. Wenn der Spiel herunterfällt wird er wieder an den Start gesetzt.                                                                                                                                                                                  |
|  3 | Objektanzahl variabel | Die Anzahl der Objekte hängt von der Level.json datei ab. In ihr werden alle Objekte des Levels angegeben und dann bei öffnen der Webseite generiert.                                                                                                                                                     |
|  4 | Szenenhierarchie      | An oberster Stelle in der Szenenhierarchie ist das game. Darunter ist einmal eine Background node unter der alle Backgrounds hängen, die Charakter node und die level node unter der die einzelnen Platformen sind.                                                                                                                                               |
|  5 | Sound                 | Bei drücken des Play Buttons wird die Hintergrundmusik abgespielt. Sie kann mit Hilfe des "Toggle music" Buttons pausiert und wieder gestartet werden.                                                            |
|  6 | GUI                   | Es gibt einen Button um das Spiel zu starten, sowie um die Hintergrundmusik ein- bzw. auszuschalten.                                                                                  |
|  7 | Externe Daten         | In der Level.json Datei kann der Levelaufbau abgeändert werden.                                                                                   |
|  8 | Verhaltensklassen     | Es ist jeweils eine Datei für den floor, die Backgrounds und den Character vorhanden. In der Character Datei werden die möglichen Aktionen und zugehörigen Sprites festgelegt, und die CollisionDetection findet hier statt. Mit hilfe der Backgrounds Datei werden die einzelnen Layer des paralaxen Backgrounds erstellt und dargestellt und mit Hilfe der Floor Datei können die einzelnen Platformen des Levels erstellt werden. Der LevelLoader wird benutzt, um aus der Level.json das Level zu generieren.                                                                                               |
|  9 | Subklassen            | Character, Background, Floor und Grapple sind jeweils Sub-Klassen von f.Node und erweitern Node um die jeweils gebrauchten Funktionen und Variablen. |
| 10 | Maße & Positionen     | Der Spielcharakter ist ca. eine Unit groß, spring ca. zwei Units und läuft maximal 3 Units pro Sekunde. Ich fand das vom Spielgefühl her am besten.                                                                |
| 11 | Event-System          | Das Event System wird verwendet, um bei drücken der HTML Buttons die richtigen Aktionen auszuführen. Außerdem werden bei drücken einer der belegten Tasten Events abgefeuert, welche dann für die Bewegung und die Animation der Figur verantwortlich sind.  |



Platformer asset pack: https://jesse-m.itch.io/jungle-pack

Platformer Music: Tropical Jungle by Redafs.com, Licensed under Creative Commons: By Attribution 3.0 License https://www.youtube.com/watch?v=DYXsQuoQ-yk

Platformer sound effects: https://kronbits.itch.io/freesfx
