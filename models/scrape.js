const mongoose =  require('mongoose');
const Schema   =  mongoose.Schema;

let Scrape_Schema = new Schema(
  {
    eth_trader_subscribers:  { type: String },
    author                :  { type: String },
    author_flair_text     :  { type: String },
    author_fullname       :  { type: String },
    created_utc           :  { type: Date },
    distinguished         :  { type: String },
    edited                :  { type: Schema.Types.Mixed },
    gilded                :  { type: Number },
    gildings              :  { type: [{
      gid_1                :  { type: Number },
      gid_2                :  { type: Number },
      gid_3                :  { type: Number },
    }]},
    id                    :  { type: String },
    link_flair_text       :  { type: String },
    locked                :  { type: Boolean },
    name                  :  { type: String },
    num_comments          :  { type: Number },
    permalink             :  { type: String },
    price                 :  { type: Number },
    score                 :  { type: Number },
    selftext              :  { type: String },
    subreddit             :  { type: String },
    subreddit_id          :  { type: String },
    subreddit_subscribers :  { type: Number },
    stickied              :  { type: Boolean },
    title                 :  { type: String },
    ups                   :  { type: Number },
    upvote_ratio          :  { type: Number },
    post_url              :  { type: String },
    reddit_comments              :  { type: [{
      author                :  { type: String },
      author_flair_text     :  { type: String },
      author_fullname       :  { type: String },
      body                  :  { type: String },
      collapsed             :  { type: Boolean },
      controversiality      :  { type: Number },
      created_utc           :  { type: Date },
      depth                 :  { type: Number },
      distinguished         :  { type: String },
      edited                :  { type: Schema.Types.Mixed },
      gilded                :  { type: Number },
      gildings              :  { type: [{
        gid_1                 :  { type: Number },
        gid_2                 :  { type: Number },
        gid_3                 :  { type: Number },
      }]},
      id                    :  { type: String },
      is_submitter          :  { type: Boolean },
      link_id               :  { type: String },
      locked                :  { type: Boolean },
      name                  :  { type: String },
      parent_id             :  { type: String },
      permalink             :  { type: String },
      score                 :  { type: Number },
      stickied              :  { type: Boolean },
      ups                   :  { type: Number },
    }]},  // End reddit_comments
    pushShift_comments           :  { type: [{
      author                :  { type: String },
      author_flair_text     :  { type: String },
      author_fullname       :  { type: String },
      body                  :  { type: String },
      collapsed             :  { type: Boolean },
      controversiality      :  { type: Number },
      created_utc           :  { type: String },
      depth                 :  { type: Number },
      distinguished         :  { type: String },
      edited                :  { type: Schema.Types.Mixed },
      gilded                :  { type: Number },
      gildings              :  { type: [{
        gid_1                 :  { type: Number },
        gid_2                 :  { type: Number },
        gid_3                 :  { type: Number },
      }]},
      id                    :  { type: String },
      is_submitter          :  { type: Boolean },
      link_id               :  { type: String },
      locked                :  { type: Boolean },
      name                  :  { type: String },
      parent_id             :  { type: String },
      permalink             :  { type: String },
      retrieved_on          :  { type: String }, 
      score                 :  { type: Number },
      stickied              :  { type: Boolean },
      ups                   :  { type: Number },
    }]},  // End pushShift_comments
});       // End Schema


/**
|--------------------------------------------------------------------------
| Virtual setup
|--------------------------------------------------------------------------
*/

// Virtual for the Scrape's URL
Scrape_Schema
.virtual('url')
.get(function () {
  return '/api/scrape/' + this._id;
});

Scrape_Schema
.virtual('json_url')
.get(function () {
  return '/api/json/' + this._id;
});

const Scrape   = mongoose.model('Scrape', Scrape_Schema);
module.exports = Scrape;