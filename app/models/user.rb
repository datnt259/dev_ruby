class User < ActiveRecord::Base
  require 'digest/md5'
  require 'sqlite3'
  #attr_accessible :password, :email
  #before_save :encrypt_password
  
  #def encrypt_password
  #  self.encrypted_password = User.encrypt(self.password)
  #end

  def self.encrypt(string)
    Digest::MD5.hexdigest(string)
  end

  def self.authenticate(email, password)
    find_by_email_and_encrypted_password(email, User.encrypt(password))
  end
  
  def self.checkExist(email)
    find_by_email(email)
  end
  
  def self.insertDb(email, password)
    #rows = ActiveRecord::Base.connection.execute(  "insert into users values ( ?, ?, ? )", email, password, User.encrypt(password))
    User.create(:email=> email, :password => password, :encrypted_password => User.encrypt(password)) 
  end
end
