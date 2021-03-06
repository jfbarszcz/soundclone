Soundclone.Views.CommentForm = Backbone.View.extend({

  initialize: function (options) {
    this.parentId = options.parentId;
  },

  events: {
    "click button.submit": "submit",
    "click button.cancel": "cancel"
  },

  template: JST['comments/form'],

  tagName: 'form',

  render: function () {
    this.$el.html(this.template({comment: this.model}));
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var that = this;
    var attrs = this.$el.serializeJSON();
    if (this.parentId) {
      attrs.comment.parent_id = this.parentId;
    }

    this.model.save(attrs, {
      success: function (model, response) {
        model.set(response);
        that.collection.add(model, {trigger: true});
        that.trigger("clear");
      }
    });
  },

  cancel: function () {
    event.preventDefault();
    this.trigger("clear")
  }
});
