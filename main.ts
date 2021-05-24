function Select_Mode () {
    if (rec_data == "Q") {
        car_mode = 1
    } else if (rec_data == "W") {
        car_mode = 2
    } else if (rec_data == "E") {
        car_mode = 3
    } else if (rec_data == "A") {
        car_mode = 0
        turtleBit.state(MotorState.brake)
    }
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Heart)
    connected = 1
    while (connected == 1) {
        rec_data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        Control_Car()
        Select_Mode()
        control_RGB()
        control_Neopixel()
        control_music()
    }
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
})
function control_RGB () {
    if (rec_data == "r") {
        turtleBit.SetLed(
        LR.LeftSide,
        255,
        0,
        0
        )
        turtleBit.SetLed(
        LR.RightSide,
        255,
        0,
        0
        )
    } else if (rec_data == "g") {
        turtleBit.SetLed(
        LR.LeftSide,
        0,
        255,
        0
        )
        turtleBit.SetLed(
        LR.RightSide,
        0,
        255,
        0
        )
    } else if (rec_data == "b") {
        turtleBit.SetLed(
        LR.LeftSide,
        0,
        0,
        255
        )
        turtleBit.SetLed(
        LR.RightSide,
        0,
        0,
        255
        )
    } else if (rec_data == "y") {
        turtleBit.SetLed(
        LR.LeftSide,
        255,
        255,
        0
        )
        turtleBit.SetLed(
        LR.RightSide,
        255,
        255,
        0
        )
    } else if (rec_data == "c") {
        turtleBit.SetLed(
        LR.LeftSide,
        100,
        200,
        100
        )
        turtleBit.SetLed(
        LR.RightSide,
        100,
        200,
        100
        )
    } else if (rec_data == "p") {
        turtleBit.SetLed(
        LR.LeftSide,
        255,
        100,
        255
        )
        turtleBit.SetLed(
        LR.RightSide,
        255,
        100,
        255
        )
    } else if (rec_data == "x") {
        turtleBit.OFFLed()
    }
}
function car_avoid () {
    distance_val = turtleBit.ultra()
    if (distance_val <= 10) {
        turtleBit.run(DIR.Turn_Left, 80)
    } else {
        turtleBit.run(DIR.Run_forward, 80)
    }
}
function Control_Car () {
    if (rec_data == "F") {
        turtleBit.run(DIR.Run_back, 100)
    } else if (rec_data == "B") {
        turtleBit.run(DIR.Run_forward, 100)
    } else if (rec_data == "L") {
        turtleBit.run(DIR.Turn_Left, 100)
    } else if (rec_data == "R") {
        turtleBit.run(DIR.Turn_Right, 100)
    } else if (rec_data == "S") {
        turtleBit.state(MotorState.brake)
    }
}
function control_Neopixel () {
    if (rec_data == "h") {
        Neo_data = 1
    } else if (rec_data == "j") {
        Neo_data = 2
    } else if (rec_data == "k") {
        Neo_data = 3
    } else if (rec_data == "l") {
        Neo_data = 0
        changeColor()
    } else if (rec_data == "m") {
        Neo_data = 0
        strip.clear()
        strip.show()
    }
}
function neo_watar () {
    for (let index = 0; index <= 4; index++) {
        strip.setPixelColor(index, neopixel.colors(NeoPixelColors.Red))
        strip.show()
        control.waitMicros(100000)
    }
    for (let index2 = 0; index2 <= 4; index2++) {
        strip.setPixelColor(index2, neopixel.colors(NeoPixelColors.Purple))
        strip.show()
        control.waitMicros(100000)
    }
    for (let index3 = 0; index3 <= 4; index3++) {
        strip.setPixelColor(index3, neopixel.colors(NeoPixelColors.White))
        strip.show()
        control.waitMicros(100000)
    }
}
function car_follow () {
    if (distance_val > 9 && distance_val <= 30) {
        turtleBit.run(DIR.Run_forward, 80)
    } else if (distance_val > 6 && distance_val <= 9) {
        turtleBit.state(MotorState.brake)
    } else if (distance_val <= 6) {
        turtleBit.run(DIR.Run_back, 80)
    } else if (distance_val <= 30) {
        turtleBit.state(MotorState.brake)
    }
}
function changeColor () {
    color_c_flag = color_c_flag + 1
    if (color_c_flag == 11) {
        color_c_flag = 1
    }
    if (color_c_flag == 1) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    } else if (color_c_flag == 2) {
        strip.showColor(neopixel.colors(NeoPixelColors.Orange))
    } else if (color_c_flag == 3) {
        strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
    } else if (color_c_flag == 4) {
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
    } else if (color_c_flag == 5) {
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
    } else if (color_c_flag == 6) {
        strip.showColor(neopixel.colors(NeoPixelColors.Indigo))
    } else if (color_c_flag == 7) {
        strip.showColor(neopixel.colors(NeoPixelColors.Violet))
    } else if (color_c_flag == 8) {
        strip.showColor(neopixel.colors(NeoPixelColors.Purple))
    } else if (color_c_flag == 9) {
        strip.showColor(neopixel.colors(NeoPixelColors.White))
    } else if (color_c_flag == 10) {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
    }
}
function control_music () {
    if (rec_data == "1") {
        music.ringTone(262)
    } else if (rec_data == "2") {
        music.ringTone(294)
    } else if (rec_data == "3") {
        music.ringTone(330)
    } else if (rec_data == "4") {
        music.ringTone(349)
    } else if (rec_data == "5") {
        music.ringTone(392)
    } else if (rec_data == "6") {
        music.ringTone(440)
    } else if (rec_data == "7") {
        music.ringTone(494)
    } else if (rec_data == "8") {
        music.ringTone(523)
    } else if (rec_data == "9") {
        music.rest(music.beat(BeatFraction.Eighth))
    }
}
function car_Tracking () {
    if (turtleBit.LineTracking() == 2 || (turtleBit.LineTracking() == 3 || (turtleBit.LineTracking() == 5 || (turtleBit.LineTracking() == 6 || turtleBit.LineTracking() == 7)))) {
        turtleBit.run(DIR.Run_forward, 60)
    } else if (turtleBit.LineTracking() == 4) {
        turtleBit.Motor(LR.LeftSide, MD.Back, 80)
        turtleBit.Motor(LR.RightSide, MD.Forward, 80)
    } else if (turtleBit.LineTracking() == 1) {
        turtleBit.Motor(LR.LeftSide, MD.Forward, 80)
        turtleBit.Motor(LR.RightSide, MD.Back, 80)
    } else {
        turtleBit.state(MotorState.brake)
    }
}
let color_c_flag = 0
let Neo_data = 0
let distance_val = 0
let connected = 0
let car_mode = 0
let rec_data = ""
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P8, 4, NeoPixelMode.RGB)
turtleBit.LED_brightness(200)
basic.forever(function () {
    distance_val = turtleBit.ultra()
    if (car_mode == 1) {
        car_avoid()
    } else if (car_mode == 2) {
        car_follow()
    } else if (car_mode == 3) {
        car_Tracking()
    }
    if (Neo_data == 1) {
        strip.setPixelColor(randint(0, 4), neopixel.hsl(neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255)), 255, 50))
        strip.show()
    } else if (Neo_data == 2) {
        for (let index4 = 0; index4 <= 4; index4++) {
            strip.setPixelColor(index4, neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255)))
            strip.show()
            control.waitMicros(100000)
            strip.clear()
        }
    } else if (Neo_data == 3) {
        neo_watar()
    } else if (Neo_data == 4) {
        strip.showBarGraph(0, 255)
    }
})
