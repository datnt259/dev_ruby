class RegisterController < ApplicationController
  def index
  end

  def create
    unless params[:password] == params[:password_confirmation]
      flash[:notice] = 'password confirmation and password are difference'
      redirect_to register_path
      return
    end
    
    if User.checkExist(params[:email])
      flash[:notice] = 'This username had been registered. Please choose another username'
      redirect_to register_path
      return
    end
    
    User.insertDb(params[:email],params[:password])
    flash[:notice] = 'You have successfully registered. Please check your email to complete registration'
    redirect_to login_path
  end
end
