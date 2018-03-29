// const tabsBtn = $('[role = "presentation"]');
// const tabsPanel = $('.tab-content');
//
//
// function tabClick(e) {
//     const target = $(this);
//     const link = target.find('a');
//     const id = link.attr('aria-controls');
//     const panel = tabsPanel.find(`#${id}`);
//     const activePanel = tabsPanel.find('.active');
//
//     e.preventDefault();
//
//     if (!target.hasClass('active')){
//         tabsBtn.removeClass('active');
//         target.addClass('active');
//
//         activePanel.fadeOut(150, () => {
//             activePanel.removeClass('active in');
//
//             panel.fadeIn(150, () => {
//                 panel.addClass('active in');
//             })
//         });
//     }
// }
//
// tabsBtn.on('click', tabClick);

(function ($) {
    //tabs

    const controls = $('.nav-tabs li a');
    //add event listener
    controls.on('click', tabs);
    //click handler
    function tabs(e) {
        e.preventDefault();
        if($(this).closest('li').hasClass('active')) return;
        //find parents
        const list = $(this).closest('ul');
        const tabContent = list.next();
        const target = $($(this).attr('href'));
        const tabActive = tabContent.find('.tab-pane.active');

        //set active class
        list.find('li.active').removeClass('active');
        $(this).closest('li').addClass('active');

        //show active tab
        tabActive.fadeOut('fast', () => {
            tabActive.removeClass('active');
            target.fadeIn('fast', () => target.addClass('active'));
        });
    }
}(jQuery));