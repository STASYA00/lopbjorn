import argparse
import textwrap

from local_article import LocalArticle, TAGS
from bucket_manager import BucketManager

class SubmitPipe:
    manager = BucketManager()
    blob_path = "Articles/{}/article.md"

    @staticmethod
    def gen_meta(article:LocalArticle):
        return {
            TAGS.INTRO.value: article.intro,
            TAGS.KWRD.value: article.kwrd
        }
    
    @classmethod
    def run(cls, fname:str):
        try:
            article = LocalArticle(fname)
            cls.manager.upload(cls.blob_path.format(article.blob_name), fname)
            cls.manager.set_metadata(cls.blob_path.format(article.blob_name), cls.gen_meta(article))
        except Exception as e:
            print(e)



if __name__=="__main__":
    parser = argparse.ArgumentParser(
			formatter_class=argparse.RawDescriptionHelpFormatter,
			description=textwrap.dedent('''\
			USAGE: python3 submit.py --source article.md

	        ------------------------------------------------------------------------
	
	        An app to submit a blog article for Lopbjörn project to GCS.
	
	        ------------------------------------------------------------------------
	
	        --source        article filepath to submit, str
	
	        ------------------------------------------------------------------------
	
	        '''), epilog=textwrap.dedent('''\
	        Don't forget to run `gcloud auth login` before running the submit app.
	        '''))
            
    parser.add_argument('--source', type=str, help='article filepath to submit, str')

	############################################################################
     
    args = parser.parse_args()
    print(args.source)
    SubmitPipe.run(args.source)