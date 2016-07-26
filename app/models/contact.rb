class Contact < ActiveRecord::Base
  validates :email, uniqueness: true
end