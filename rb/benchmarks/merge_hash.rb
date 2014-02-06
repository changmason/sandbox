require 'benchmark'


LOOP_SIZE = 1000

puts "Replace merge:"
puts Benchmark.measure {
  hash = {}
  LOOP_SIZE.times { |i| hash = hash.merge(i => i) }
}

puts "Inplace merge:"
puts Benchmark.measure {
  hash = {}
  LOOP_SIZE.times { |i| hash.merge!(i => i) }
}

puts "Direct assignment:"
puts Benchmark.measure {
  hash = {}
  LOOP_SIZE.times { |i| hash[i] = i }
}
