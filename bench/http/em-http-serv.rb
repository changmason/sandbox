# https://gist.github.com/897613
require 'eventmachine'
require 'evma_httpserver'

class MyHttpServer < EM::Connection
  include EM::HttpServer

   def post_init
     super
     no_environment_strings
   end

  def process_http_request
    response = EM::DelegatedHttpResponse.new(self)
    response.status = 200
    response.content_type 'text/plain'
    response.content = 'Hello World\n'
    response.send_response
  end
end

EM.run{
  EM.start_server '0.0.0.0', 8080, MyHttpServer
}