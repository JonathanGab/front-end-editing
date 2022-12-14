module.exports = {
  style: {
    drawer_width: '30%',
  },
  wordpress_module: {
    //. entrez l'ancetre et la key de votre objet
    url_website_back: 'http://localhost/module/wp-json/wp/v2/',
    // afin de pouvoir afficher les champs correspondants lors du filtre
    url_token_module: 'http://localhost/module/wp-json/jwt-auth/v1/token',
    filter: [
      'racine',
      'id',
      'title',
      'rendered',
      'content',
      'acf',
      'pieces',
      'superficie',
      'better_featured_image',
      'source_url',
    ],
    // precisez le nom de votre cms
    cms: 'wordpress',
    // utilisez vous un module pour generer des customs fields ?
    // si oui precisez le nom du module ci dessous le nom utilisé dans l'api
    // nous recommandons l'utilisation du module Advanced Custom Fields (ACF) saissisez le
    // de la même manière que dans l'api afin d'avoir la bonne sortie
    custom_fields: 'acf',
    draft: 'publish',
  },
  drupal_module: {
    // precisez le nom de votre cms
    cms: 'drupal',
    // url de votre api drupal ne rien préciser après le node/
    url_website_back: 'http://localhost/drupalSite/jsonapi/node/',
    //. entrez l'ancetre et la key de votre objet
    // afin de pouvoir afficher les champs correspondants
    filter: [
      'id',
      'data',
      'attributes',
      'title',
      'status',
      'body',
      'value',
      'included',
      'url',
    ],
    string_input_filter: ['title', 'value'],
    exclude_number_input: ['body', 'attributes'],
    exclude_boolean_input: ['uri'],
    // publier les articles ou les stocker en brouillon
    draft: false,
    style: {
      // largeur du drawer
      drawer_width: '50%',
      // couleur de l'arrière plan du drawer
      paper_color: 'rgba(223, 223, 223, 0.562)',
    },
    // chemin vers l'url qui stock les images
    media_url: 'http://localhost/drupalSite/jsonapi/file/file',
    // les langages disponibles doivent être activer dans drupal
    language_array: ['fr', 'en', 'es'],
  },
};
