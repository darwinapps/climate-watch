require 'csv'

module S3CSVReader
  def self.read(filename)
    bucket_name = Rails.application.secrets.s3_bucket_name
    s3 = Aws::S3::Client.new
    begin
      file = s3.get_object(bucket: bucket_name, key: filename)
    rescue Aws::S3::Errors::NoSuchKey
      Rails.logger.error "File #{filename} not found in #{bucket_name}"
      return
    end

    CSV.parse(
      file.body.read,
      headers: true,
      header_converters: :symbol
    )
  end
end
