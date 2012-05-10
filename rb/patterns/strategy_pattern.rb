# A strategy pattern example referenced from wikipedia 
# http://en.wikipedia.org/wiki/Strategy_pattern

# The context class uses this to call the concrete strategy
class Strategy
  def execute(a, b); end
end

class ConcreteStrategyAdd < Strategy
  def execute(a, b)
    puts "Called ConcreteStrategyAdd's execute()"
    a + b
  end
end

class ConcreteStrategySubstract < Strategy
  def execute(a, b)
    puts "Called ConcreteStrategySubstract's execute()"
    a - b
  end
end

class ConcreteStrategyMultiply < Strategy
  def execute(a, b)
    puts "Called ConcreteStrategyMultiply's execute()"
    a * b
  end
end

# Configured with a ConcreteStrategy object and maintains a reference to a Strategy object
class Context
  def initialize(strategy)
    @strategy = strategy
  end
  def execute_strategy(a, b)
    @strategy.execute(a, b)
  end
end

# StrategyExample test application
class StrategyExample
  context = Context.new(ConcreteStrategyAdd.new)
  result_a = context.execute_strategy(3, 4)

  context = Context.new(ConcreteStrategySubstract.new)
  result_b = context.execute_strategy(3, 4)

  context = Context.new(ConcreteStrategyMultiply.new)
  result_c = context.execute_strategy(3, 4)
  
  puts result_a, result_b, result_c
end