# README
## chat-spaceとは
チャットアプリです。グループにユーザーを招待し、メッセージや画像のやりとりができます。

<img src="https://github.com/yusukesugahara/chat-space/blob/master/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202019-05-14%2013.04.39.png">

## DB設計
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
  - has_many :members
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
  - has_many :members
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


