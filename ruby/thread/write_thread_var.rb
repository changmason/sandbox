# write thread variable from main thread

require "thread"

t = Thread.new do 
  100.times { 
    sleep 1
    current = Thread.current
    puts "I got #{current["var"]} from user."
  }
end

t["var"] = 1
sleep 1
t["var"] = 2
sleep 1