FROM ubuntu:14.04

MAINTAINER Mason Chang "changmason@gmail.com"
ENV REFRESHED_AT 2015-10-18

RUN apt-get update
RUN apt-get -y install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev

WORKDIR /root
RUN git clone git://github.com/sstephenson/rbenv.git .rbenv
RUN echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
RUN echo 'eval "$(rbenv init -)"' >> ~/.bash_profile

# Install ruby
RUN git clone git://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
RUN echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bash_profile
RUN ["/bin/bash", "-c", "-l", "rbenv install -v 2.2.3"]
RUN ["/bin/bash", "-c", "-l", "rbenv global 2.2.3"]

# Install nodejs
RUN git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
RUN echo '. ~/.nvm/nvm.sh' >> ~/.bash_profile
RUN ["/bin/bash", "-c", "-l", "nvm install v4.2.1"]
RUN ["/bin/bash", "-c", "-l", "nvm alias default v4.2.1"]

# Create new rails project
RUN ["/bin/bash", "-c", "-l", "gem install rails passenger --no-ri --no-rdoc"]
RUN ["/bin/bash", "-c", "-l", "rails new /var/www/webapp"]

WORKDIR /var/www/webapp
# RUN ["/bin/bash", "-c", "-l", "rbenv exec passenger start"]

EXPOSE 3000