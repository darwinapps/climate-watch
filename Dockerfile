FROM ruby:2.4.1
MAINTAINER Jose Angel Parreño <joseangel.parreno@vizzuality.com>

ENV NAME climate-watch

# Set application environment
ARG RAILS_ENV
ENV RAILS_ENV $RAILS_ENV
ENV RACK_ENV $RAILS_ENV
ENV NODE_ENV $RAILS_ENV

ENV ESP_API https://data.emissionspathways.org/api/v1
ENV CW_API /api/v1
ENV GFW_API https://production-api.globalforestwatch.org
ENV S3_BUCKET_NAME climate-watch-dev
ENV GOOGLE_ANALYTICS_ID UA-1981881-51

# Install dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/* \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs build-essential patch zlib1g-dev liblzma-dev libicu-dev \
    && npm install -g yarn

RUN gem install bundler --no-ri --no-rdoc

# Create app directory
RUN mkdir -p /usr/src/$NAME
WORKDIR /usr/src/$NAME
# VOLUME /usr/src/$NAME

# Install and run scheduling
#RUN gem install whenever
#RUN whenever --load-file config/schedule.rb
#RUN whenever --update-crontab

# Install app dependencies
COPY Gemfile Gemfile.lock ./

RUN bundle install --without development test --jobs 4 --deployment

# Env variables
ARG secretKey
ENV SECRET_KEY_BASE $secretKey

ARG APPSIGNAL_PUSH_API_KEY
ENV APPSIGNAL_PUSH_API_KEY $APPSIGNAL_PUSH_API_KEY

ARG FEATURE_DATA_EXPLORER
ENV FEATURE_DATA_EXPLORER $FEATURE_DATA_EXPLORER

ARG FEATURE_DATA_SURVEY
ENV FEATURE_DATA_SURVEY $FEATURE_DATA_SURVEY

ARG USER_SURVEY_SPREADSHEET_URL
ENV USER_SURVEY_SPREADSHEET_URL $USER_SURVEY_SPREADSHEET_URL

# Bundle app source
COPY . ./

EXPOSE 3000

# Rails assets compile
RUN bundle exec rake assets:precompile

# Start app
CMD bundle exec rake tmp:clear db:migrate && bundle exec rails s -b 0.0.0.0
