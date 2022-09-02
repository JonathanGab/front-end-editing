module.exports = {
  wordpress_module: {
    filter: [
      'racine',
      'id',
      'title',
      'rendered',
      'content',
      'acf',
      'pieces',
      'superficie',
    ],
    cms: 'wordpress',
    // utilisez vous un module pour generer des customs fields ?
    // si oui precisez le nom du module ci dessous le nom utilisé dans l'api
    // nous recommandons l'utilisation du module Advanced Custom Fields (ACF)
    custom_fields: 'acf',
  },
  drupal_module: {
    //. entrez l'ancetre et la key de votre objet
    //. afin de pouvoir afficher les champs correspondants
    filter: [
      'id',
      'racine',
      'attributes',
      'title',
      'status',
      'body',
      'value',
      'field_background',
    ],
    //. precisez le nom de votre cms
    cms: 'drupal',
  },
};
