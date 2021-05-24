def Select_Mode():
    global car_mode
    if rec_data == "Q":
        car_mode = 1
    elif rec_data == "W":
        car_mode = 2
    elif rec_data == "E":
        car_mode = 3
    elif rec_data == "A":
        car_mode = 0
        turtleBit.state(MotorState.BRAKE)

def on_bluetooth_connected():
    global connected, rec_data
    basic.show_icon(IconNames.HEART)
    connected = 1
    while connected == 1:
        rec_data = bluetooth.uart_read_until(serial.delimiters(Delimiters.HASH))
        Control_Car()
        Select_Mode()
        control_RGB()
        control_Neopixel()
        control_music()
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    basic.show_icon(IconNames.SAD)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def control_RGB():
    if rec_data == "r":
        turtleBit.set_led(LR.LEFT_SIDE, 255, 0, 0)
        turtleBit.set_led(LR.RIGHT_SIDE, 255, 0, 0)
    elif rec_data == "g":
        turtleBit.set_led(LR.LEFT_SIDE, 0, 255, 0)
        turtleBit.set_led(LR.RIGHT_SIDE, 0, 255, 0)
    elif rec_data == "b":
        turtleBit.set_led(LR.LEFT_SIDE, 0, 0, 255)
        turtleBit.set_led(LR.RIGHT_SIDE, 0, 0, 255)
    elif rec_data == "y":
        turtleBit.set_led(LR.LEFT_SIDE, 255, 255, 0)
        turtleBit.set_led(LR.RIGHT_SIDE, 255, 255, 0)
    elif rec_data == "c":
        turtleBit.set_led(LR.LEFT_SIDE, 100, 200, 100)
        turtleBit.set_led(LR.RIGHT_SIDE, 100, 200, 100)
    elif rec_data == "p":
        turtleBit.set_led(LR.LEFT_SIDE, 255, 100, 255)
        turtleBit.set_led(LR.RIGHT_SIDE, 255, 100, 255)
    elif rec_data == "x":
        turtleBit.off_led()
def car_avoid():
    global distance_val
    distance_val = turtleBit.ultra()
    if distance_val <= 10:
        turtleBit.run(DIR.TURN_LEFT, 80)
    else:
        turtleBit.run(DIR.RUN_FORWARD, 80)
def Control_Car():
    if rec_data == "F":
        turtleBit.run(DIR.RUN_FORWARD, 100)
    elif rec_data == "B":
        turtleBit.run(DIR.RUN_BACK, 100)
    elif rec_data == "L":
        turtleBit.run(DIR.TURN_LEFT, 100)
    elif rec_data == "R":
        turtleBit.run(DIR.TURN_RIGHT, 100)
    elif rec_data == "S":
        turtleBit.state(MotorState.BRAKE)
def control_Neopixel():
    global Neo_data
    if rec_data == "h":
        Neo_data = 1
    elif rec_data == "j":
        Neo_data = 2
    elif rec_data == "k":
        Neo_data = 3
    elif rec_data == "l":
        Neo_data = 0
        changeColor()
    elif rec_data == "m":
        Neo_data = 0
        strip.clear()
        strip.show()
def neo_watar():
    for index in range(5):
        strip.set_pixel_color(index, neopixel.colors(NeoPixelColors.RED))
        strip.show()
        control.wait_micros(100000)
    for index2 in range(5):
        strip.set_pixel_color(index2, neopixel.colors(NeoPixelColors.PURPLE))
        strip.show()
        control.wait_micros(100000)
    for index3 in range(5):
        strip.set_pixel_color(index3, neopixel.colors(NeoPixelColors.WHITE))
        strip.show()
        control.wait_micros(100000)
def car_follow():
    if distance_val > 9 and distance_val <= 30:
        turtleBit.run(DIR.RUN_FORWARD, 80)
    elif distance_val > 6 and distance_val <= 9:
        turtleBit.state(MotorState.BRAKE)
    elif distance_val <= 6:
        turtleBit.run(DIR.RUN_BACK, 80)
    elif distance_val <= 30:
        turtleBit.state(MotorState.BRAKE)
def changeColor():
    global color_c_flag
    color_c_flag = color_c_flag + 1
    if color_c_flag == 11:
        color_c_flag = 1
    if color_c_flag == 1:
        strip.show_color(neopixel.colors(NeoPixelColors.RED))
    elif color_c_flag == 2:
        strip.show_color(neopixel.colors(NeoPixelColors.ORANGE))
    elif color_c_flag == 3:
        strip.show_color(neopixel.colors(NeoPixelColors.YELLOW))
    elif color_c_flag == 4:
        strip.show_color(neopixel.colors(NeoPixelColors.GREEN))
    elif color_c_flag == 5:
        strip.show_color(neopixel.colors(NeoPixelColors.BLUE))
    elif color_c_flag == 6:
        strip.show_color(neopixel.colors(NeoPixelColors.INDIGO))
    elif color_c_flag == 7:
        strip.show_color(neopixel.colors(NeoPixelColors.VIOLET))
    elif color_c_flag == 8:
        strip.show_color(neopixel.colors(NeoPixelColors.PURPLE))
    elif color_c_flag == 9:
        strip.show_color(neopixel.colors(NeoPixelColors.WHITE))
    elif color_c_flag == 10:
        strip.show_color(neopixel.colors(NeoPixelColors.BLACK))
def control_music():
    if rec_data == "1":
        music.ring_tone(262)
    elif rec_data == "2":
        music.ring_tone(294)
    elif rec_data == "3":
        music.ring_tone(330)
    elif rec_data == "4":
        music.ring_tone(349)
    elif rec_data == "5":
        music.ring_tone(392)
    elif rec_data == "6":
        music.ring_tone(440)
    elif rec_data == "7":
        music.ring_tone(494)
    elif rec_data == "8":
        music.ring_tone(523)
    elif rec_data == "9":
        music.rest(music.beat(BeatFraction.EIGHTH))
def car_Tracking():
    if turtleBit.line_tracking() == 2 or (turtleBit.line_tracking() == 3 or (turtleBit.line_tracking() == 5 or (turtleBit.line_tracking() == 6 or turtleBit.line_tracking() == 7))):
        turtleBit.run(DIR.RUN_FORWARD, 60)
    elif turtleBit.line_tracking() == 4:
        turtleBit.motor(LR.LEFT_SIDE, MD.BACK, 80)
        turtleBit.motor(LR.LEFT_SIDE, MD.FORWARD, 80)
    elif turtleBit.line_tracking() == 1:
        turtleBit.motor(LR.LEFT_SIDE, MD.FORWARD, 80)
        turtleBit.motor(LR.LEFT_SIDE, MD.BACK, 80)
    else:
        turtleBit.state(MotorState.BRAKE)
color_c_flag = 0
Neo_data = 0
distance_val = 0
connected = 0
car_mode = 0
rec_data = ""
strip: neopixel.Strip = None
strip = neopixel.create(DigitalPin.P8, 4, NeoPixelMode.RGB)
turtleBit.LED_brightness(200)

def on_forever():
    global distance_val
    distance_val = turtleBit.ultra()
    if car_mode == 1:
        car_avoid()
    elif car_mode == 2:
        car_follow()
    elif car_mode == 3:
        car_Tracking()
    if Neo_data == 1:
        strip.set_pixel_color(randint(0, 4),
            neopixel.hsl(neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255)),
                255,
                50))
        strip.show()
    elif Neo_data == 2:
        for index4 in range(5):
            strip.set_pixel_color(index4,
                neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255)))
            strip.show()
            control.wait_micros(100000)
            strip.clear()
    elif Neo_data == 3:
        neo_watar()
    elif Neo_data == 4:
        strip.show_bar_graph(0, 255)
basic.forever(on_forever)
