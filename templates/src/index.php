<?php 
$root_path = $_SERVER['DOCUMENT_ROOT'];
include($root_path . '/partials/head.php'); 
?>

<nav class="navigation" data-component='{ "component": "navigation" }'>
	<div class="container">
		<div class="navigation__inner">
			<a href="#" class="navigation__logo">
				<img class="navigation__logo__image" src="/assets/images/logo.svg" alt="Segelteam">
			</a>

			<div class="navigation__main">
				<ul class="navigation__links">
					<li>
						<a class="navigation__links__item label color-light" href="#">About us</a>
					</li>
					<li>
						<a class="navigation__links__item label color-light" href="#">Gallery</a>
					</li>
					<li>
						<a class="navigation__links__item label color-light" href="#">Crew</a>
					</li>
				</ul>
				
				<?php echo generate_component_button([
					'label' => 'Contact',
					'class' => 'navigation__button',
					'icon' => 'arrow-right',
					'icon_type' => 'symbol',
					'icon_right' => true,
				]) ?>
			</div>

			<div class="navigation__mobile-toggle js-navigation__mobile-toggle">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	</div>
</nav>

<section class="hero">
	<div class="hero__main">
		<div class="hero__visual">
			<?php echo generate_component_image([
				'sources' => [
					[
						'src' => '/assets/images/hero.jpg',
						'width' => 1920,
					]
				],
				'alt' => 'Segeln',
				'class' => 'hero__visual__image',
			]) ?>
		</div>
		<div class="hero__inner container">
			<div class="hero__inner__content">
				<?php echo generate_component_headline([
					'label' => 'This is my headline',
					'tag' => 'h1',
					'tag_class' => 'h1',
					'class' => 'hero__headline color-light'
				]); ?>
				<div class="hero__text copy color-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus massa est scelerisque penatibus. </div>
			</div>
		</div>
	</div>
	<div class="hero__bottom">
		<div class="hero__teasers">
			<div class="hero__teasers__left">
				<?php for($i = 0; $i < 2; $i++) {
					$style = null;
					if($i == 1) $style = 'black';
					echo generate_component_teaser([
						'style' => $style,
						'uptitle' => '0' . $i + 1 . ' Mai',
						'headline' => [
							'label' => 'My teaser title',
							'tag' => 'h2',
							'tag_class' => 'h5',
						],
						'subtitle' => 'Subtitle',
						'text' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
					]);
				} ?>
			</div>
			<div class="hero__teasers__right">
				<?php 
					$illustration = '/assets/images/map.svg';
					echo generate_component_teaser([
						'illustration' => $illustration,
						'uptitle' => '03 Mai',
						'headline' => [
							'label' => 'My teaser title',
							'tag' => 'h2',
							'tag_class' => 'h3',
						],
						'subtitle' => 'Subtitle',
						'text' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
					]);
				?>
			</div>
		</div>
	</div>
</section>

<section class="text-content">
	<div class="container">
		<div class="text-content__inner">
			<div class="text-content__top">
				<?php echo generate_component_headline([
					'label' => 'This is my headline',
					'tag' => 'h2',
					'tag_class' => 'h2',
					'class' => 'text-content__headline'
				]); ?>
				<?php echo generate_component_headline([
					'label' => 'Subtitle goes here',
					'tag' => 'div',
					'tag_class' => 'h5',
					'class' => 'text-content__subtitle'
				]); ?>
			</div>
			<div class="text-content__text copy">
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
			</div>
		</div>
	</div>
</section>

<section class="team">
	<?php echo generate_component_image([
		'sources' => [
			[
				'src' => '/assets/images/visual.jpg',
				'width' => 810,
			],
		],
		'class' => 'team__intro-img',
	]); ?>

	<div class="team__header">
		<div class="team__header__title">
			<h2>Unser Team</h2>
			<h5>Subtitle Goes Here</h5>
		</div>
		<div class="team__header__filters">
			<div data-filter="all" class="data-filter data-filter--active">Show all</div>
			<div data-filter="trim" class="data-filter">Trim</div>
			<div data-filter="tactic" class="data-filter">Tactic</div>
			<div data-filter="helmsman" class="data-filter">Helsmann</div>
		</div>
	</div>

    <div class="photos">
        <!-- 
            The Layout of the grid:

            <grid>
              	<row>
					<cell>
						<facts>
							<h5/>
							<p/>
						</facts>
						<img/>
					</cell>
                ...
				</row>
				<row/>
				<row/>
              ...
            </grid>
        -->
        <div class="photos__grid photos__grid--5"><!-- Rendered dynamically --></div>

        <div class="photos__size-controls">
            <div data-size="2" class="data-size data-size--mobile">2</div>
            <div data-size="3" class="data-size data-size--mobile">3</div>
            <div data-size="4" class="data-size">4</div>
            <div data-size="5" class="data-size data-size--active">5</div>
            <div data-size="6" class="data-size">6</div>
          	</div>
    </div>

    <div class="button-container">
        <button class="btn js-load-btn">Load More</button>
    </div>
</section>

<footer class="footer">
	<div class="footer__left">
		<img src="./assets/images/logo.svg" alt="" draggable="false" />
		<small>© 2021. Segel-Team. Alle Rechte vorbehalten</small>
	</div>
	<div class="footer__right">
		<div class="footer__links">
			<ul>
				<li><a href="#">About Us</a></li>
				<li><a href="#">Gallery</a></li>
				<li><a href="#">Crew</a></li>
				<li><a href="#">Contact</a></li>
			</ul>

			<ul>
				<li><a href="#">Impressum</a></li>
				<li><a href="#">Datenschutz</a></li>
				<li><a href="#">Rechtliches</a></li>
				<li><a href="#">Copyright</a></li>
			</ul>
		</div>

		<div class="footer__media">
			<a target="_blank" href="https://www.facebook.com/">
				<img src="./assets/icons/inline/facebook.svg" alt="" draggable="false" />
			</a>
			<a target="_blank" href="https://twitter.com/">
				<img src="./assets/icons/inline/twitter.svg" alt="" draggable="false" />
			</a>
			<a target="_blank" href="https://www.instagram.com/">
				<img src="./assets/icons/inline/instagram.svg" alt="" draggable="false" />
			</a>
			<a target="_blank" href="https://www.youtube.com/">
				<img src="./assets/icons/inline/youtube.svg" alt="" draggable="false" />
			</a>
		</div>
	</div>
</footer>

<?php include($root_path . '/partials/foot.php'); ?>  