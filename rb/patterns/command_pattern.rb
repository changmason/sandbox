# A command pattern example referenced from wikipedia 
# http://en.wikipedia.org/wiki/Command_pattern

# The Invoker class
class Switch
  def initialize(flip_up_cmd, flip_down_cmd)
    @flip_up_command = flip_up_cmd
    @flip_down_command = flip_down_cmd
  end
  
  def flip_up
    @flip_up_command.execute
  end
  
  def flip_down
    @flip_down_command.execute
  end
end

# The Receiver class
class Light
  def turn_on
    puts "The light is on"
  end
  
  def turn_off
    puts "The light is off"
  end
end

# The Command interface
class Command
  def execute; end
end

# The Command for turning on the light
class FlipUpCommand < Command
  def initialize(light)
    @light = light
  end
  
  def execute
    @light.turn_on
  end
end

# The Command for turn off the light
class FlipDownCommand < Command
  def initialize(light)
    @light = light
  end
  
  def execute
    @light.turn_off
  end
end

# The test class or Client
class LightSwitch
  def initialize
    @lamp = Light.new
    @switch_up = FlipUpCommand.new(@lamp)
    @switch_down = FlipDownCommand.new(@lamp)
    @switch = Switch.new(@switch_up, @switch_down)
  end
  
  def switch(cmd)
    cmd = cmd.strip.upcase
    if cmd == "ON"
      @switch.flip_up
    elsif cmd == "OFF"
      @switch.flip_down
    else
      puts "Argument \"ON\" or \"OFF\" is required."
    end
  end
end

# Test the program
light_switch = LightSwitch.new
puts "Switch ON test."
light_switch.switch("ON")
puts "Switch OFF test."
light_switch.switch("OFF")
puts "Invalid Command test"
light_switch.switch("*****")