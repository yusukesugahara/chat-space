Rails.application.routes.draw do
  get 'users/edit'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'messages#index'
  get 'messages' => 'messages#index'
end
