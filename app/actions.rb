# Homepage (Root path)
get '/' do
  @contacts = Contact.all
  @contact = Contact.new
  erb :index
end

post '/add_contact' do
  @contact = Contact.create(
    name: params[:name],
    email: params[:email]
    )
  if request.xhr?
    content_type :json
    @contact.to_json
  else
    redirect '/'
  end
end

post '/delete_contact' do
  @delete_contact = Contact.find params[:contact]
  @delete_contact.destroy
  if request.xhr?
    content_type :json
    @delete_contact.to_json
  else
    redirect '/'
  end
end

get '/contact/edit' do
  @contact = Contact.update
end