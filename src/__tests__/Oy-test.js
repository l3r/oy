import Oy from '../Oy';


describe('Oy', function() {
  it('should expose PropTypes, Element, and renderTemplate', function() {
    expect(Oy.PropTypes).toBeDefined();
    expect(Oy.PropTypes.rules).toBeDefined();
    expect(Oy.Element).toBeDefined();
    expect(Oy.renderTemplate).toBeDefined();
  });

  it('should use provided base template generator by default', function() {
    const shouldThrow = () => {
      Oy.renderTemplate({
        title: 'Foo bar',
        bodyContent: '<h1>Testing</h1>'
      });
    };

    expect(shouldThrow).toThrow();

    const rawHTML = Oy.renderTemplate({
      title: 'Foo bar',
      bodyContent: '<h1>Testing</h1>',
      previewText: 'Baz qux',
      headCSS: '.foo { color: red; }'
    });

    expect(rawHTML.indexOf('<title>Foo bar</title>') !== -1).toEqual(true);
    expect(rawHTML.indexOf('Baz qux') !== -1).toEqual(true);
    expect(rawHTML.indexOf('<h1>Testing</h1>') !== -1).toEqual(true);
    expect(rawHTML.indexOf('.foo { color: red; }') !== -1).toEqual(true);
  });

  it('should use custom base template generator', function() {
    const generateCustomTemplate = () => {
      return '<h1>Testing 123</h1>';
    };

    const rawHTML = Oy.renderTemplate({}, generateCustomTemplate);
    expect(rawHTML).toEqual('<h1>Testing 123</h1>');
  });

  it('should warn on outputs larger than 100KB', function() {
    console.warn = jasmine.createSpy('log');
    const rawHTML = Oy.renderTemplate({
      title: 'Foo bar',
      bodyContent: Array(1024 * 101).join('.'),
      previewText: 'Baz qux'
    });
    expect(console.warn).toHaveBeenCalled();
  });

  it('should set default dir attribute when generating default template', function() {
    const rawHTML = Oy.renderTemplate({
      title: 'Foo bar',
      bodyContent: '<h1>Testing</h1>',
      previewText: 'Baz qux'
    });

    expect(rawHTML.indexOf('dir="ltr"') !== -1).toEqual(true);
    expect(rawHTML.indexOf('lang') !== -1).toEqual(false);
  });

  it('should set overriding dir attribute when generating default template', function() {
    const rawHTML = Oy.renderTemplate({
      title: 'Foo bar',
      bodyContent: '<h1>Testing</h1>',
      previewText: 'Baz qux',
      dir: 'rtl'
    });

    expect(rawHTML.indexOf('dir="rtl"') !== -1).toEqual(true);
    expect(rawHTML.indexOf('lang') !== -1).toEqual(false);
  });

  it('should set lang attribute when generating default template', function() {
    const rawHTML = Oy.renderTemplate({
      title: 'Foo bar',
      bodyContent: '<h1>Testing</h1>',
      previewText: 'Baz qux',
      lang: 'fr'
    });

    expect(rawHTML.indexOf('dir="ltr"') !== -1).toEqual(true);
    expect(rawHTML.indexOf('lang="fr"') !== -1).toEqual(true);
  });
});
