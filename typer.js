var Word = Backbone.Model.extend({
	move: function() {
		this.set({y:this.get('y') + this.get('speed')});
	}
});

var Words = Backbone.Collection.extend({
	model:Word
});

var WordView = Backbone.View.extend({
	initialize: function() {
		$(this.el).css({position:'absolute'});
		var string = this.model.get('string');
		var letter_width = 25;
		var word_width = string.length * letter_width;
		if(this.model.get('x') + word_width > $(window).width()) {
			this.model.set({x:$(window).width() - word_width});
		}
		for(var i = 0;i < string.length;i++) {
			$(this.el)
				.append($('<div>')
					.css({
						width:letter_width + 'px',
						padding:'5px 2px',
						'border-radius':'4px',
						'background-color':'#fff',
						border:'1px solid #ccc',
						'text-align':'center',
						float:'left'
					})
					.text(string.charAt(i).toUpperCase()));
		}
		
		this.listenTo(this.model, 'remove', this.remove);
		
		this.render();
	},
	
	render:function() {
		$(this.el).css({
			top:this.model.get('y') + 'px',
			left:this.model.get('x') + 'px'
		});
		var highlight = this.model.get('highlight');
		$(this.el).find('div').each(function(index,element) {
			if(index < highlight) {
				$(element).css({'font-weight':'bolder','background-color':'#aaa',color:'#fff'});
			} else {
				$(element).css({'font-weight':'normal','background-color':'#fff',color:'#000'});
			}
		});
	}
});

var TyperView = Backbone.View.extend({
	initialize: function() {
		var wrapper = $('<div>')
			.css({
				position:'fixed',
				top:'0',
				left:'0',
				width:'100%',
				height:'100%'
			});
		this.wrapper = wrapper;
		
		var self = this;
		var text_input = $('<input>')
			.addClass('form-control')
			.css({
				'border-radius':'4px',
				position:'absolute',
				bottom:'0',
				'min-width':'60%',
				width:'60%',
				'margin-bottom':'10px',
				'z-index':'1000'
			}).keyup(function() {
				var words = self.model.get('words');
				for(var i = 0;i < words.length;i++) {
					var word = words.at(i);
					var typed_string = $(this).val();
					var string = word.get('string');
					if(string.toLowerCase().indexOf(typed_string.toLowerCase()) == 0) {
						word.set({highlight:typed_string.length});
                        self.model.defaults.temp_typed_string = typed_string;
                        if(typed_string.length == string.length) {
							$(this).val('');
                            self.model.defaults.score+=5;
						}
					} else {
						word.set({highlight:0});
                        if (self.model.defaults.temp_typed_string !== '') {
                            if (string.toLowerCase().indexOf(self.model.defaults.temp_typed_string.toLowerCase()) == 0) {
                                self.model.defaults.score-=5;
                            }
                        }
					}
				}
			});

        var btn_wrapper = $('<div>')
            .css({
                position: 'absolute',
                bottom: '20px',
                'z-index': '9999'
            });

        var start_btn = $('<button>')
            .addClass('btn btn-success')
            .text('Start')
            .css({display: 'none'})
            .click(function(){
                self.model.start();
                $(this).css({display: 'none'});
                stop_btn.css({display: 'inline'});
            });
        var stop_btn = $('<button>')
            .addClass('btn btn-danger')
            .text('Stop')
            .click(function(){
                self.model.stop();
                $(this).css({display: 'none'});
                start_btn.css({display: 'inline'});
                $('.word').remove();
                self.model.defaults.score = 0;
            });
        var pause_btn = $('<button>')
            .addClass('btn btn-default')
            .text('Pause')
            .css({'margin-left': '5px'})
            .click(function(){
                self.model.stop();
            });
        var resume_btn = $('<button>')
            .addClass('btn btn-default')
            .text('Resume')
            .css({'margin-left': '5px'})
            .click(function(){
                self.model.start();
            });
        var score_wrapper = $('<div>')
			.css({
				position: 'absolute',
				right: '40px',
				bottom: '20px',
				'z-index': 999
			});
        var score = $('<strong>')
			.html('Score : <span id="scores">' + self.model.defaults.score + '</span>');

        $(this.el)
            .append(wrapper
                .append($('<form>')
                    .attr({
                        role:'form'
                    })
                    .submit(function() {
                        return false;
                    })
                    .append(text_input))
                .append(btn_wrapper
                    .append(start_btn)
                    .append(stop_btn)
                    .append(pause_btn)
                    .append(resume_btn))
				.append(score_wrapper
					.append(score))
            );
		
		text_input.css({left:((wrapper.width() - text_input.width()) / 2) + 'px'});
		text_input.focus();
		
		this.listenTo(this.model, 'change', this.render);
	},
	
	render: function() {
		var model = this.model;
		var words = model.get('words');

        $('#scores').text(model.defaults.score);

        for(var i = 0;i < words.length;i++) {
			var word = words.at(i);
			if(!word.get('view')) {
				var word_view_wrapper = $('<div>');
				this.wrapper.append(word_view_wrapper);
				word.set({
					view:new WordView({
						model: word,
						el: word_view_wrapper
					})
				});
			} else {
				word.get('view').render();
			}
		}
	}
});

var Typer = Backbone.Model.extend({
	defaults:{
		max_num_words:10,
		min_distance_between_words:50,
		words:new Words(),
		min_speed:1,
		max_speed:5,
		score: 0,
		temp_typed_string: ''
	},
	
	initialize: function() {
		new TyperView({
			model: this,
			el: $(document.body)
		});
	},

	start: function() {
		var animation_delay = 30;
		var self = this;
		self.iterateInterval = setInterval(function() {
			self.iterate();
		},animation_delay);
	},

    stop: function () {
        var self = this;
        clearInterval(self.iterateInterval);
    },
	
	iterate: function() {
		var words = this.get('words');
		if(words.length < this.get('max_num_words')) {
			var top_most_word = undefined;
			for(var i = 0;i < words.length;i++) {
				var word = words.at(i);
				if(!top_most_word) {
					top_most_word = word;
				} else if(word.get('y') < top_most_word.get('y')) {
					top_most_word = word;
				}
			}
			
			if(!top_most_word || top_most_word.get('y') > this.get('min_distance_between_words')) {
				var random_company_name_index = this.random_number_from_interval(0,company_names.length - 1);
				var string = company_names[random_company_name_index];
				var filtered_string = '';
				for(var j = 0;j < string.length;j++) {
					if(/^[a-zA-Z()]+$/.test(string.charAt(j))) {
						filtered_string += string.charAt(j);
					}
				}
				
				var word = new Word({
					x:this.random_number_from_interval(0,$(window).width()),
					y:0,
					string:filtered_string,
					speed:this.random_number_from_interval(this.get('min_speed'),this.get('max_speed'))
				});
				words.add(word);
			}
		}
		
		var words_to_be_removed = [];
		for(var i = 0;i < words.length;i++) {
			var word = words.at(i);
			word.move();
			
			if(word.get('y') > $(window).height() || word.get('move_next_iteration')) {
				words_to_be_removed.push(word);
			}
			
			if(word.get('highlight') && word.get('string').length == word.get('highlight')) {
				word.set({move_next_iteration:true});
			}
		}
		
		for(var i = 0;i < words_to_be_removed.length;i++) {
			words.remove(words_to_be_removed[i]);
		}

        $(window).on('resize', function () {
            for (var i = 0; i < words.length; i++) {
            	var word = words.at(i);
            	var word_width = word.get(string).length * 25;
                if (word.get('x') + word_width > $(window).width()) {
                	word.set({x:$(window).width() - word_width});
                }
            }
        });
		
		this.trigger('change');
	},
	
	random_number_from_interval: function(min,max) {
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
});