# Use ChildProcess to get the "long_running" code run even if the program exit.
# However, ChildProcess still does not work on Windows, even through JRuby.

require 'rubygems'
require 'childprocess'

long_running = <<-EOC
  File.open("child_process.log", "w") do |f|
    100.times do |i|
      f.puts "count: " + i.to_s
      sleep 0.1
    end
  end
EOC

puts "Process build."
process = ChildProcess.build("jruby", "-e", long_running)
puts "Process start."
process.start
puts "Process alive? #{process.alive?}"

