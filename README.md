# Syntax of Gnemark

```bash
$ Heading 1
$$ Heading 2
$$$ Heading 3
$$$$ Heading 4
$$$$$ Heading 5
$$$$$$ Heading 6

^This is italic text^

?This is bold text?

> Item 1
> Item 2
> Item 3

% This is a blockquote

::MyLink::[URL]

::img[alt](url)

::table::
| Name  | Age | City    |
|-------|-----|--------|
| John  | 25  | New York |
| Alice | 30  | London  |
| Bob   | 28  | Berlin  |
::endtable::
```

# Installation 

- Install Gnemark globally
```bash
npm install -g gnemark
```
- Create a file e.g. example.gne
```bash
touch example.gne
```

- Convert example.gne to example.html

```bash
gne2html example.gne
```
