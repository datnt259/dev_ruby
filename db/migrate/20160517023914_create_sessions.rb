class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string :username
      t.string :password
      t.string :encrypt_password

      t.timestamps null: false
    end
  end
end
