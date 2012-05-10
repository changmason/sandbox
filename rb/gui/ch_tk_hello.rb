#!/usr/bin/env ruby -Ku

# A simple GUI example using Tk, which can be packaged as single executable file by
# ocra ch_tk_hello.rb --windows C:\Ruby187\lib\tcltk\ --no-autoload --add-all-core


require 'tk'

root = TkRoot.new { title "哈囉,世界!" }
TkLabel.new(root) do
   text '哈囉,世界!'
   pack { padx 15 ; pady 15; side 'left' }
end
Tk.mainloop