module AuthHelper
  NETWORKS = %w(facebook google twitter)

  def redirect_to_api_gateway_login(api_url, network = nil)
    if NETWORKS.contain(network)
      redirect_to "#{ENV['API_URL']}/#{network}/auth?callbackUrl=#{api_url}&token=true"
    else
      redirect_to "#{ENV['API_URL']}/auth?callbackUrl=#{api_url}&token=true"
    end
  end

  def redirect_to_api_gateway_logout(api_url)
    redirect_to "#{ENV['API_URL']}/auth/logout?callbackUrl=#{api_url}"
  end

  # TODO: The commented code should be used if we decide to have a session in the server

  # def jwt_authentication
  #   unless session.key?('user_token')
  #     redirect_to_api_gateway_login
  #   end
  # end

  def ensure_logged_in
    return false unless session[:user_token]
    connect = Faraday.new(url: "#{ENV['API_URL']}") do |faraday|
      faraday.request :url_encoded # form-encode POST params
      faraday.response :logger # log requests to STDOUT
      faraday.adapter Faraday.default_adapter # make requests with Net::HTTP
    end
    connect.authorization :Bearer, session[:user_token]
    response = connect.get('/auth/check-logged')
    if !response.success?
      session.delete(:user_token)
      session.delete(:current_user)
      false
    else
      user_data = JSON.parse response.body
      session[:current_user] = user_data.symbolize_keys!
      session[:current_user][:user_id] = ::MyCw::User.find_by ct_id: session[:current_user][:id]
      true
    end
  end

end
