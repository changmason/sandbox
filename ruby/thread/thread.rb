require "net/http"

pages = %w( pragprog.com
            rubyonrails.org
            ruby-lang.org )

threads = []

for page in pages 
  threads << Thread.new(page) do |mypage|
    h = Net::HTTP.new(mypage, 80)
    puts "Fetching: #{mypage}"
    resp, data = h.get("/")
    puts "Got #{mypage}:  #{resp.message}"
  end
end

threads.each { |th| th.join }

# note that we don't pass the local variable "page" to the created 
# directly because it is not thread safe. Instead, we pass the "page"
# in as a parameter, and then the parameter is passed to the block
# as "mypage" which is really localized inside the thread.