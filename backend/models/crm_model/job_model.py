from datetime import datetime
from app import db

class Job(db.Model):
    __tablename__ = 'jobs'
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.String(50), unique=True, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    freight_type = db.Column(db.String(50))  # e.g., Air, Sea, Road
    status = db.Column(db.String(50))        # e.g., Pending, In Transit, Delivered
    description = db.Column(db.String(500))  
    created_at = db.Column(db.DateTime, default=datetime.utcnow)






    def generate_job_id(freight_type):
        current_date = datetime.now().strftime("%Y%m%d")
        latest_job = Job.query.filter_by(freight_type=freight_type).order_by(Job.id.desc()).first()
        
        if latest_job:
            last_job_num = int(latest_job.job_id.split('-')[-1])
            new_job_num = last_job_num + 1
        else:
            new_job_num = 1

        return f"{freight_type}-{current_date}-{str(new_job_num).zfill(3)}"
