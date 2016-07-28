class Contact < ActiveRecord::Base
  validates :email, uniqueness: true

  scope :search, -> (search) { where("name like :var1 OR email like :var1", var1: "%#{search}%" )}
end