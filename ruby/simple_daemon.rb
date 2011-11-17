# A simple daemon which can be used to process jobs in background.
# This daemon will work in both Ruby and JRuby, but not on Windows.
# Please note that the name of the source file must feat the name
# of the daemon class, or you will have an error. 

require 'rubygems'
require 'raad'

class SimpleDaemon
  def start
    Raad::Logger.debug("SimpleDaemon Start")
    while !Raad.stopped?
      Raad::Logger.info("SimpleDaemon running")
      # write out your code here which will check a tcp port or a database
      # for a incoming job, and then process the job within this daemon
      sleep(1)
    end
  end
  
  def stop
    Raad::Logger.debug("SimpleDeamon stop")
  end
end

