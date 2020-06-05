import PDFDocument from 'pdfkit'
import fs from 'fs'

const doc = new PDFDocument()

doc.pipe(fs.createWriteStream('/path/to/file.pdf'))

doc.text('Hello world!')

doc.end()
