const accordionItem = $('.accordion-item');

function itemClick (e) {
    const target = $(this);
    const activeItem = $('.active');

    if(target.hasClass('active')){
        target.find('.accordion-body').slideToggle(300, () => { target.removeClass('active')})

    } else if(!target.hasClass('active')){
        target.find('.accordion-body').slideToggle(300, () => {target.addClass('active')});
        activeItem.find('.accordion-body').slideToggle(300, () => {
            activeItem.removeClass('active');
        })

    }
}

accordionItem.on('click', itemClick);