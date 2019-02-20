# README

* Database creation
 ## membersテーブル

  |Column|Type|Options|
  |------|----|-------|
  |user_id|integer|null: false, foreign_key: true|
  |group_id|integer|null: false, foreign_key: true|

  ### Association
  - belongs_to :group
  - belongs_to :user

  ## groupテーブル

  |Column|Type|Options|
  |------|----|-------|
  |name|String|null: false, unique: true|
  |member_id|integer|null: false, foreign_key: true|
  |message_id|integer|null: false, foreign_key: true|

  ### Association
  - has_many :users, :through => :members
  - has_many :messages

  ## userテーブル

  |Column|Type|Options|
  |------|----|-------|
  |name|String|null: false, unique: true|
  |member_id|integer|null: false, foreign_key: true|
  |email|String|null: false, unique: true|
  |encrypted_password|String|null: false, |

  ### Association
  - has_many :groups, :through => :members
  - has_many :messages

  ## messageテーブル

  |Column|Type|Options|
  |------|----|-------|
  |group_id|integer|null: false, foreign_key: true,|
  |user_id|integer|null: false, foreign_key: true,|
  |body|text||
  |image|string||

  ### Association
  - belongs_to :user
  - belongs_to :groups


* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
