# This program demostrates how to generate pdf file on the fly 
# and present it to the user in a Sinatra web app

require 'sinatra'
require 'haml'
require 'prawn'

get '/new' do
  haml :new, :layout => false
end

post '/create' do
  msg = params["message"]
  Prawn::Document.generate("hello.pdf") do
    text "You were saying: #{msg}"
  end
  redirect :show
end

get '/show' do
  send_file 'hello.pdf', :type => :pdf
end

Sinatra::Application.run

__END__
@@ new
!!!
%html
  %head
    %title Generate PDF
  %body
    %h1 Generate PDF
    %form(action="/create" method="post")
      %label Type your words:
      %input(type="text" name="message")
      %input(type="submit" value="send")
