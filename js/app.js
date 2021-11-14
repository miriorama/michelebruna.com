var BRUNA = (function() {
    let bruna = {
        METHOD: 'method',
        EXHIBITION: 'exhibition'
    };

    bruna.showWork = function(workId) {
        let $body = document.querySelector('body');

        // Se non ho passato un id vuol dire che devo chiudere
        if(!workId) {
            // Tolgo l'overflow:hidden al body
            $body.classList.remove('o-hidden');

            let $work = document.querySelector('.work.selected');
            if($work) {
                $work.classList.remove('selected');

                let $scroller = $work.querySelector('.work-gallery');
                $scroller.removeEventListener('scroll', onScroll);
            }
            return;
        }

        // Aggiungo l'overflow:hidden al body per evitare che interferisca con lo scroll del lavoro
        $body.classList.add('o-hidden');

        let $work = document.querySelector(`#${workId}`);
        $work.classList.add('selected');



        let isExhibition = $work.getAttribute('data-is-exhibition');
        if(isExhibition) {
            $work.classList.add('is-exhibition');
        }

        let backgroundColor = $work.getAttribute('data-background-color');
        let color = $work.getAttribute('data-color');
        $work.setAttribute('style', `--work-color: ${color};--work-background-color:${backgroundColor}`);

        let $separator = $work.querySelector('.gallery-separator');
        let $gallery = $work.querySelector('.gallery');
        let $workArrowDown = $work.querySelector('.work-arrow-down');

        let $scroller = $work.querySelector('.work-gallery');
        $scroller.addEventListener('scroll', onScroll);

        function onScroll() {
            let scrollTop =  $work.querySelector('.work-gallery').scrollTop;
            let offsetTop = ($separator ? $separator.offsetTop : 0);

            if (offsetTop) {
                if (scrollTop > (offsetTop - window.innerHeight / 2)) {
                    $work.classList.add('is-exhibition');

                    let $switchExhibition = $work.querySelector('[data-switch=exhibition]');
                    if($switchExhibition) {
                        $switchExhibition.classList.add('selected');
                    }

                    let $switchMethod = $work.querySelector('[data-switch=method]');
                    if($switchMethod) {
                        $switchMethod.classList.remove('selected');
                    }
                } else {
                    $work.classList.remove('is-exhibition');

                    let $switchExhibition = $work.querySelector('[data-switch=exhibition]');
                    $switchExhibition.classList.remove('selected');
                    let $switchMethod = $work.querySelector('[data-switch=method]');
                    $switchMethod.classList.add('selected');
                }
            }

            // se sono quasi al fondo
            if($gallery.offsetHeight - window.innerHeight <= scrollTop) {
                $workArrowDown.classList.add('is-bottom');
            } else {
                $workArrowDown.classList.remove('is-bottom');
            }
        }
    }

    bruna.scrollTo = function(target) {
        let $current = document.querySelector('.work.selected');

        let offsetTop;
        if (target === BRUNA.EXHIBITION) {
            offsetTop = $current.querySelector('.gallery-separator').offsetTop;
        } else {
            offsetTop = 0;
        }

        let $gallery = $current.querySelector('.work-gallery');
        $gallery.scroll({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    bruna.scrollDown = function($el) {
        let $current = document.querySelector('.work.selected');
        let scrollTop = $current.querySelector('.work-gallery').scrollTop + 500;
        let $gallery = $current.querySelector('.work-gallery');

        // se sono al fondo torno su
        if ($el.classList.contains('is-bottom')) {
            scrollTop = 0;
        }

        $gallery.scroll({
            top: scrollTop ,
            behavior: 'smooth'
        });
    }

    bruna.init = function() {
        let $works = document.querySelectorAll('.work');

        for (const $work of $works) {
            $work.removeAttribute('hidden');
        }

        BRUNA.setYear();

        window.addEventListener('popstate', (event) => {
            BRUNA.view();
        });
        BRUNA.view();
    }

    bruna.setYear = function() {
        document.getElementById('year').innerHTML = new Date().getFullYear();
    }

    bruna.view = function(viewId = null) {
        if (viewId) {
            history.pushState({}, viewId, (viewId !== '/' ? '?' + viewId : '/'));
        } else {
            viewId = window.location.search.substring(1);
        }

        BRUNA.showWork((viewId === '/' ? null : viewId));
    }

    return bruna;
})();

BRUNA.init();