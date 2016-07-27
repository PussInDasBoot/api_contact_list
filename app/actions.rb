# Homepage (Root path)
get '/' do
  @contacts = Contact.all
  @contact = Contact.new
  erb :index
end

get '/api/contacts' do
  @contacts = Contact.all
  content_type :json
  @contacts.to_json
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

post '/api/delete_contact' do
  @delete_contact = Contact.find params[:contact]
  @delete_contact.destroy
  if request.xhr?
    content_type :json
    @delete_contact.to_json
  else
    redirect '/'
  end
end

post '/api/edit_contact' do
  puts params
  @contact = Contact.find_by(email: params[:oldemail])
  @contact.update(
    name: params[:name],
    email: params[:email])
  if request.xhr?
    content_type :json
    @delete_contact.to_json
  else
    redirect '/'
  end
end