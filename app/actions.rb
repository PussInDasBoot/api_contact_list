# Homepage (Root path)
get '/' do
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
  @contact = Contact.find params[:contactid]
  @contact.update(
    name: params[:name],
    email: params[:email])
  if request.xhr?
    content_type :json
    @contact.to_json
  else
    redirect '/'
  end
end

get '/api/search' do
  if params[:search]
    @contacts = Contact.search(params[:search])
  elsif params[:search].blank?
    @contacts = Contact.all
  end
  if request.xhr?
    content_type :json
    @contacts.to_json
  else
    redirect '/'
  end
end