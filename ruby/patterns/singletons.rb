# There are 3 steps to create a singleton
#  1. create class variable
#  2. initialize the class variable with the singleton instance
#  3. make the class method, "new", private
class SingletonOne
  class << self
    attr_reader :instance
  end
  @instance = SingletonOne.new
  private_class_method :new
end
puts "Singleton one: "
puts SingletonOne.instance.inspect
puts SingletonOne.instance.inspect


# Same as above, but using standard library
require "singleton"
class SingletonTwo
  include Singleton
end
puts "Singleton two: "
puts SingletonTwo.instance.inspect
puts SingletonTwo.instance.inspect


# class as Singleton
class SingletonClass
end

# module as Singleton
class SingletonModule
end

