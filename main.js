var status1, sound, font
object = []

function preload() {
    sound = loadSound("alert.mp3")
    font = loadFont("ShortStack-Regular.ttf")
}

function setup() {
    canvas = createCanvas(640, 420)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function modelLoaded() {
    console.log("Loaded")
    status1 = true
}

function gotResults(error, results) {
    if (error) {
        console.log("Error")
    }
    else {
        object = results
        console.log(results)
    }
}

function draw() {
    image(video, 0, 0, 640, 420)
    if (status1 != false) {
        objectDetector.detect(video, gotResults)
        for (i = 0; i < object.length; i++) {
            strokeWeight(3)
            noFill()
            rect(object[i].x, object[i].y, object[i].width, object[i].height)
            stroke("red")
            fill("red")
            strokeWeight(1)
            textFont(font)
            percent = floor(object[i].confidence * 100)
            text(object[i].label + ", " + percent + "%", object[i].x + 10, object[i].y + 15)
            document.getElementById("status").innerHTML = "Status : Detected"
            if (object[i].label == "person") {
                document.getElementById("found").innerHTML = "Baby Found"
                    sound.stop()
                     
            }
            else {
                document.getElementById("found").innerHTML = "Baby Not Found"
                sound.stop()
                sound.play()
            }
        }

    }
}
