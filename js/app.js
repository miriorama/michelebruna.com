var BRUNA = (function() {
    let bruna = {
        METHOD: 'method',
        EXHIBITION: 'exhibition'
    };

    bruna.showWork = function(workId, view = BRUNA.METHOD) {
        let $work = document.querySelector(`#${workId}`);
        $work.classList.add('selected');

        if(view === BRUNA.EXHIBITION) {
            $work.classList.add('is-exhibition');
        }

        let backgroundColor = $work.getAttribute('data-background-color');
        let color = $work.getAttribute('data-color');
        $work.setAttribute('style', `--work-color: ${color};--work-background-color:${backgroundColor}`);

        let $separator = $work.querySelector('.gallery-separator');
        let $gallery = $work.querySelector('.gallery');
        let $workArrowDown = $work.querySelector('.work-arrow-down');

        const scroller = $work.querySelector('.work-gallery');
        scroller.addEventListener('scroll', event => {
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
                    console.log(scrollTop, offsetTop);
                    $work.classList.remove('is-exhibition');

                    let $switchExhibition = $work.querySelector('[data-switch=exhibition]');
                    $switchExhibition.classList.remove('selected');
                    let $switchMethod = $work.querySelector('[data-switch=method]');
                    $switchMethod.classList.add('selected');


                    /*if( window.innerHeight > ) {

                    }*/
                }
            }

            // se sono quasi al fondo
            if($gallery.offsetHeight - window.innerHeight <= scrollTop) {
                $workArrowDown.classList.add('is-bottom');
            } else {
                $workArrowDown.classList.remove('is-bottom');
            }
        });
    }
    bruna.closeWork = function() {
        let $work = document.querySelector('.work.selected')
        $work.classList.remove('selected');
    }
    bruna.showMethod = function() {


        let $method = $current.querySelector(`.gallery-method`);
        let $items = $current.querySelector(`.gallery-exhibition`);
        //$method.removeAttribute('hidden');
        //$items.setAttribute('hidden', '');

        /*let $gallery = $current.querySelector('.work-gallery');
        $gallery.scroll({
            top: 0,
            behavior: 'smooth'
          });*/

        let $switchExhibition = $current.querySelector('[data-switch=exhibition]');
        $switchExhibition.classList.remove('selected');
        let $switchMethod = $current.querySelector('[data-switch=method]');
        $switchMethod.classList.add('selected');
    }

    bruna.showExhibition = function() {
        let $current = document.querySelector('.work.selected');


        let $method = $current.querySelector(`.gallery-method`);
        let $items = $current.querySelector(`.gallery-exhibition`);
        //$items.removeAttribute('hidden');
        //$method.setAttribute('hidden', '');

        let $gallery = $current.querySelector('.work-gallery');
        //$gallery.scroll({
        //    top: 0,
        //    behavior: 'smooth'
        //  });

        let $switchExhibition = $current.querySelector('[data-switch=exhibition]');
        $switchExhibition.classList.add('selected');
        let $switchMethod = $current.querySelector('[data-switch=method]');
        $switchMethod.classList.remove('selected');
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
    }

    return bruna;
})();

BRUNA.init();