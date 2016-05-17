class LoginController < ApplicationController
  def index
    if session.key?(:user)
      redirect_to profile_path
    end
  end

  def create
    if user = User.authenticate(params[:email],params[:password])
      session[:user] = user.id
      redirect_to profile_path
    else
      flash[:notice] = 'Username or password is incorrect'
      redirect_to login_path
    end
  end

  def profile
    unless session.key?(:user)
      redirect_to login_path
    end
  end
  
  def destroy
    session.delete(:user)
    redirect_to login_path
  end
end
