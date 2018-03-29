(function ($) {

    class Modal{
        constructor(element, options) {
            this.default = {
                closeClass: 'close-modal',
                autoClose: false,
                autoCloseTime: 1000,
                opacity: .7,
                position: 'center',
                duration: 500
            };
            this.modal = element;
            this.options = $.extend(this.default, options);
            this.overlay = $('<div class ="overlay"></div>');
        }

        init() {
            this.showOverlay();
            this.showModal();
            this.events();
            this.autoCloseModal();
        }

        events() {
            this.overlay.on('click', (e) => this.closeModal());
            $(`.${this.options.closeClass}`).on('click', (e) => this.closeModal());
        }

        showOverlay() {
            // setup style
            this.overlay.css({
                'display' : 'block',
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'right': '0',
                'bottom': '0',
                'opacity': '0',
                'background-color': `rgba(0,0,0, ${this.options.opacity})`,
                'z-index': '999'

            });

            this.modal.before(this.overlay);
        }

        showModal() {
            // get wigth, height
            const halfWidth = this.modal.outerWidth() / 2;
            const halfHeight = this.modal.outerHeight() / 2;

            this.overlay.animate({
                opacity: 1
            }, this.options.duration);

            this.modal.css({
                'display' : 'block',
                'position': 'fixed',
                'top': `${this.options.position === "center" ? '50%' :
                            this.options.position === "top" ? '10%' :
                            this.options.position === "bottom" ? '90%' : '50%'}`,
                'left': '50%',
                'z-index': '1000',
                'opacity': '0',
                'margin-top': `-${halfHeight}px`,
                'margin-left': `-${halfWidth}px`
            }).animate({
                opacity: 1,
                top: '50%'
            }, this.options.duration);
        }

        closeModal() {
            //close overlay
            this.overlay.animate({
                opacity: 0
            }, this.options.duration, () => {
                this.overlay.css({'display': 'none'})
            });

            //close modal
            this.modal.animate({
                opacity: 0
            }, this.options.duration, () => {
                this.modal.css({'display': 'none'})
            });
        }

        autoCloseModal() {
            if (this.options.autoClose) {
                setTimeout(() => this.closeModal(this), this.options.autoCloseTime);
            }
        }
    }

    $.fn.easyModal = function (options) {
        // init modal

        new Modal(this, options).init();
    }

}(jQuery));
