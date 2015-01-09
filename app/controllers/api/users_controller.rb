class Api::UsersController < ApplicationController
  def new
  end

  def show
    @user = User.includes(:tracks, :playlists).find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to root_url
    else
      render :new, status: 422
    end
  end

  def user_params
    params.require(:user).permit([:username, :password])
  end
end
