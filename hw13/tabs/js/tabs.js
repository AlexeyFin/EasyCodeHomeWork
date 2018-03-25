const tabsBtn = $('[role = "presentation"]');
const tabsPanel = $('.tab-content');


function tabClick(e) {
    const target = $(this);
    const link = target.find('a');
    const id = link.attr('aria-controls');
    const panel = tabsPanel.find(`#${id}`);
    const activePanel = tabsPanel.find('.active');

    e.preventDefault();

    if (!target.hasClass('active')){
        tabsBtn.removeClass('active');
        target.addClass('active');

        activePanel.fadeOut(150, () => {
            activePanel.removeClass('active in');

            panel.fadeIn(150, () => {
                panel.addClass('active in');
            })
        });
    }
}

tabsBtn.on('click', tabClick);