class UsersController < ApplicationController

  def index

    menber_user = params.require(:users) if !params[:users].nil?


    @users = User.where('name Like(?)',"%#{params[:keyword]}%").limit(10).where.not(id: menber_user)
    respond_to do |format|
      format.json
    end
  end
  def edit
    @user = User.find(params[:id])
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end


end
