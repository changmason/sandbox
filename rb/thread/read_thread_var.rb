# read thread variable from main thread

require "thread"

count = 0
threads = []

10.times do |i|
  threads[i] = Thread.new {
    sleep(rand(0)/10.0)
    Thread.current["mycount"] = count
    count += 1
  }
end

threads.each do |t|
  t.join
  print t["mycount"], ", "
end
puts "count = #{count}"